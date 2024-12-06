from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.core.exceptions import ValidationError

from .utils import generate_unique_id, generate_barcode_image, generate_qrcode_image


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    groups = models.ManyToManyField(
        Group,
        related_name="inventory_app_user_set",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="inventory_app_user_permissions_set",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.name

    @staticmethod
    def managers_group_users():
        """Return all users in the 'Managers' group."""
        managers_group = Group.objects.filter(name="Managers").first()
        if managers_group:
            return managers_group.user_set.all()
        return User.objects.none()


class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    manager = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="managed_stores",
        limit_choices_to={"groups__name": "Managers"},
    )

    def __str__(self):
        return self.name


class Warehouse(models.Model):
    name = models.CharField(max_length=255)
    warehouse_type = models.CharField(max_length=255)
    location_id = models.CharField(max_length=12)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ItemCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=now, editable=False)

    def __str__(self):
        return self.name


class ItemUnit(models.Model):
    name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=10)
    created_at = models.DateTimeField(default=now, editable=False)
    category = models.ForeignKey(
        ItemCategory,
        related_name="units",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    warehouse = models.ForeignKey(
        "Warehouse", related_name="items", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        "ItemCategory",
        related_name="items",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    unit = models.ForeignKey(
        "ItemUnit",
        related_name="items",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    random_unique_id = models.CharField(
        max_length=12, unique=True, default=generate_unique_id
    )
    barcode = models.ImageField(upload_to="barcodes/", blank=True, null=True)
    qrcode = models.ImageField(upload_to="qrcodes/", blank=True, null=True)
    isbn = models.CharField(max_length=13, blank=True, null=True)
    serial_no = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    store = models.ForeignKey(
        Store, related_name="items", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.name

    def clean(self):
        """Ensure that the item is added only by the store's manager."""
        if self.store and self.store.manager != self.store.manager:
            raise ValidationError("You are not authorized to add items to this store.")

    def save(self, *args, **kwargs):
        generate_barcode = kwargs.pop("generate_barcode", False)
        generate_qrcode = kwargs.pop("generate_qrcode", False)

        self.clean()  # Validate before saving
        super().save(*args, **kwargs)

        if generate_barcode:
            self.barcode = generate_barcode_image(self.random_unique_id)
        if generate_qrcode:
            self.qrcode = generate_qrcode_image(self.random_unique_id)

        if generate_barcode or generate_qrcode:
            super().save(
                *args, **kwargs
            )  # Save again to update barcode and qrcode fields


class Stock(models.Model):
    item = models.OneToOneField(Item, related_name="stock", on_delete=models.CASCADE)
    warehouse = models.ForeignKey(
        Warehouse, related_name="stocks", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=0)
    last_quantity_added = models.PositiveIntegerField(default=0)
    last_quantity_reduced = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Stock of {self.item.name} in {self.warehouse.name}"


class Photo(models.Model):
    item = models.ForeignKey(Item, related_name="photos", on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="item_photos/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for {self.item.name}"
