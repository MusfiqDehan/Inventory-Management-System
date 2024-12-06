from django.urls import path
from . import views

from .views import home
from .views import warehouse
from .views import item_category
from .views import item
from .views import stock
from .views import photo

app_name = "inventory_app"

urlpatterns = [
    path('', home.index, name="index"),

    # page URLs
    path('dashboard/', home.view_dashboard, name="view_dashboard"),
    path('calendar/', home.view_calender, name="view_calendar"),

    # Warehouse URLs
    path('view-warehouse-table/', warehouse.view_warehouse_table,
         name="view_warehouse_table"),
    path('add-warehouse/', warehouse.add_warehouse,
         name="add_warehouse"),
    path('update-warehouse/<id>/', warehouse.update_warehouse,
         name="update_warehouse"),
    path('delete-warehouse/<id>/', warehouse.delete_warehouse,
         name="delete_warehouse"),
    
     # item-category URLs
    path('view-item-category-table/', item_category.view_item_category_table,
         name="view_item_category_table"),
    path('add-item-category/', item_category.add_item_category,
         name="add_item_category"),
    path('update-item-category/<id>/', item_category.update_item_category,
         name="update_item_category"),
    path('delete-item-category/<id>/', item_category.delete_item_category,
         name="delete_item_category"),

    # Stock URLs
    path('view-stock-table/', stock.view_stock_table, name="view_stock_table"),
    path('add-stock/', stock.add_stock,
         name="add_stock"),
    path('update-stock/<id>/', stock.update_stock,
         name="update_stock"),
    path('delete-stock/<id>/', stock.delete_stock,
         name="delete_stock"),

    # Item URLs
    path('view-item-table/', item.view_item_table, name="view_item_table"),
    path('add-item/', item.add_item,
         name="add_item"),
    path('get-units/', item.get_units, name='get_units'),
    path('update-item/<id>/', item.update_item,
         name="update_item"),
    path('delete-item/<id>/', item.delete_item,
         name="delete_item"),

    # Photo URLs
    path('view-photo-table/', photo.view_photo_table, name="view_photo_table"),
    path('add-photo/', photo.add_photo,
         name="add_photo"),
    path('get_item_photos/', photo.get_item_photos, name='get_item_photos'),
    path('update-photo/<id>/', photo.update_photo,
         name="update_photo"),
    path('delete-photo/<id>/', photo.delete_photo,
         name="delete_photo"),
]
