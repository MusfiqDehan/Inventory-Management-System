from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator

from ..models import ItemCategory
from ..forms import ItemCategoryForm


# ======================== Item Category Views ==========================#

def view_item_category_table(request):
    item_categories = ItemCategory.objects.all()
    table_name = "Item Category"

    context = {
        'title': 'Inventory',
        'table_name': table_name,
        'item_categories': item_categories,
    }
    return render(request, "contents/all-table/item-categories.html", context)


def add_item_category(request):
    context = {}
    data = {}

    item_categories = ItemCategory.objects.all()

    context['item_categories'] = item_categories

    data['valid'] = False
    data['add_item_category_form'] = render_to_string(
        'contents/item-category/add-item-category-form.html', context, request=request)

    if request.method == "POST":
        form = ItemCategoryForm(request.POST)

        if form.is_valid():
            form.save()
            context['alert_message'] = 'Successfully Added a Item Category'
            # update context after save
            context['item_categories'] = ItemCategory.objects.all()
            data['valid'] = True
            data['item_category_list'] = render_to_string(
                'contents/item-category/item-category-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            print(form.errors)

    return JsonResponse(data)


def update_item_category(request, id):
    data = dict()
    context = {}

    single_item_category = ItemCategory.objects.get(id=id)

    if request.method == 'POST':
        form = ItemCategoryForm(request.POST, request.FILES,
                             instance=single_item_category)

        if form.is_valid():
            form.save()
            item_categories = ItemCategory.objects.all()
            context = {
                'item_categories': item_categories,
                'alert_message': 'Successfully Updated a Item Category'
            }
            data['valid'] = True
            data['item_category_list'] = render_to_string(
                'contents/item-category/item-category-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            data['update_item_category_form'] = render_to_string(
                'contents/item-category/update-item-category-form.html', {'single_item_category': single_item_category}, request=request)
            data['valid'] = False

    else:
        data['update_item_category_form'] = render_to_string(
            'contents/item-category/update-item-category-form.html', {'single_item_category': single_item_category}, request=request)

    return JsonResponse(data)


def delete_item_category(request, id):
    data = dict()

    single_item_category = ItemCategory.objects.get(id=id)

    if request.method == 'POST':
        single_item_category.delete()

        item_categories = ItemCategory.objects.all()
        context = {
            'item_categories': item_categories,
            'alert_message': 'Successfully Deleted a Item Category'
        }
        data['valid'] = True
        data['item_category_list'] = render_to_string(
            'contents/item-category/item-category-list.html', context, request=request)
        data['alert_box'] = render_to_string(
            'includes/alert-box.html', context, request=request)

    else:
        data['delete_item_category_form'] = render_to_string(
            'contents/item-category/delete-item-category-form.html', {'single_item_category': single_item_category}, request=request)
        
    return JsonResponse(data)
