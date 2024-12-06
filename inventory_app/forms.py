from django import forms
from .models import Warehouse, Stock, Item, Photo, ItemCategory


class WarehouseForm(forms.ModelForm):
    class Meta:
        model = Warehouse
        fields = '__all__'


class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = '__all__'

class ItemCategoryForm(forms.ModelForm):
    class Meta:
        model = ItemCategory
        fields = '__all__'

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = '__all__'


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = '__all__'