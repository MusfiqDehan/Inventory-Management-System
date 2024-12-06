from django.contrib import admin
from .models import ItemCategory, ItemUnit, Warehouse, Stock, Item, Photo

admin.site.register(Warehouse)
admin.site.register(Stock)
admin.site.register(ItemCategory)
admin.site.register(ItemUnit)
admin.site.register(Item)
admin.site.register(Photo)
