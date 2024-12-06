from django.contrib import admin
from .models import ItemCategory, ItemUnit, Warehouse, Stock, Item, Photo, Store
from .forms import StoreForm

admin.site.site_header = "SuperStore Admin"
admin.site.site_title = "SuperStore"
admin.site.index_title = "SuperStore"


class StoreAdmin(admin.ModelAdmin):
    form = StoreForm


admin.site.register(Store, StoreAdmin)
admin.site.register(Warehouse)
admin.site.register(Stock)
admin.site.register(ItemCategory)
admin.site.register(ItemUnit)
admin.site.register(Item)
admin.site.register(Photo)
