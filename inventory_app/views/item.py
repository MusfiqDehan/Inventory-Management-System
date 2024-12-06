from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator

from ..models import Warehouse, Stock, ItemCategory, ItemUnit, Item, Photo, generate_unique_id
from ..forms import ItemForm


# ======================== Item Views ==========================#


def view_item_table(request):

    items = Item.objects.all()
    table_name = "Item"
    context = {
        'table_name': table_name,
        'items': items
    }
    return render(request, "contents/all-table/items.html", context)


def get_item_images(id):
    single_item = get_object_or_404(Item, id=id)

    # This will give you a QuerySet of all Photo instances related to this item
    single_item_photos = single_item.photos.all()

    return single_item_photos


def get_units(request):
    category_id = request.GET.get('category_id')
    units = ItemUnit.objects.filter(
        category_id=category_id).values('id', 'name')
    return JsonResponse(list(units), safe=False)


def add_item(request):
    context = {}
    data = {}

    warehouses = Warehouse.objects.all()
    categories = ItemCategory.objects.all()
    units = ItemUnit.objects.all()
    random_unique_id = generate_unique_id()

    context['warehouses'] = warehouses
    context['categories'] = categories
    context['units'] = units
    context['random_unique_id'] = random_unique_id
    context['table_name'] = "item"
    context['items'] = Item.objects.all()

    if request.method == "POST":
        form = ItemForm(request.POST, request.FILES)

        if form.is_valid():
            item = form.save(commit=False)

            generate_barcode = 'barcode' in request.POST
            generate_qrcode = 'qrcode' in request.POST
            isbn = request.POST.get('isbn')
            serial_no = request.POST.get('serial_no')

            if isbn:
                item.isbn = isbn
            if serial_no:
                item.serial_no = serial_no

            item.save(generate_barcode=generate_barcode,
                      generate_qrcode=generate_qrcode)

            # Save photos for the item
            files = request.FILES.getlist('photos')
            for file in files:
                Photo.objects.create(item=item, photo=file)

            # Create a stock entry for the item
            quantity = request.POST.get('quantity')
            last_quantity_added = request.POST.get('last_quantity_added')
            last_quantity_reduced = request.POST.get('last_quantity_reduced')

            Stock.objects.create(
                item=item,
                warehouse=item.warehouse,
                quantity=quantity,
                last_quantity_added=last_quantity_added,
                last_quantity_reduced=last_quantity_reduced
            )

            context['alert_message'] = 'Successfully Added an Item'
            # update context after save
            context['items'] = Item.objects.all()
            data['valid'] = True
            data['item_list'] = render_to_string(
                'contents/item/item-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            print("Form is invalid")
            print(form.errors)

    data['add_item_form'] = render_to_string(
        'contents/item/add-item-form.html', context, request=request)

    return JsonResponse(data)


# def add_item(request):
#     context = {}
#     data = {}

#     warehouses = Warehouse.objects.all()
#     categories = ItemCategory.objects.all()
#     units = ItemUnit.objects.all()
#     random_unique_id = generate_unique_id()
#     # UNIT_CHOICES = Item.UNIT_CHOICES

#     context['warehouses'] = warehouses
#     context['categories'] = categories
#     context['units'] = units
#     context['random_unique_id'] = random_unique_id
#     # context['unit_choices'] = UNIT_CHOICES
#     context['table_name'] = "item"
#     context['items'] = Item.objects.all()

#     if request.method == "POST":
#         form = ItemForm(request.POST, request.FILES)

#         if form.is_valid():
#             item = form.save()

#             # Save photos for the item
#             files = request.FILES.getlist('photos')
#             for file in files:
#                 Photo.objects.create(item=item, photo=file)

#             # Create a Item Category entry for the item
#             category = request.POST.get('category')

#             ItemCategory.objects.create(
#                 item=item,
#                 name=category,
#             )

#             # Create a Item Unit entry for the item
#             unit = request.POST.get('unit')

#             ItemUnit.objects.create(
#                 item=item,
#                 name=unit,
#             )

#             # Create a stock entry for the item
#             quantity = request.POST.get('quantity')
#             last_quantity_added = request.POST.get('last_quantity_added')
#             last_quantity_reduced = request.POST.get('last_quantity_reduced')

#             Stock.objects.create(
#                 item=item,
#                 warehouse=item.warehouse,
#                 quantity=quantity,
#                 last_quantity_added=last_quantity_added,
#                 last_quantity_reduced=last_quantity_reduced
#             )

#             context['alert_message'] = 'Successfully Added an Item'
#             # update context after save
#             context['items'] = Item.objects.all()
#             data['valid'] = True
#             data['item_list'] = render_to_string(
#                 'contents/item/item-list.html', context, request=request)
#             data['alert_box'] = render_to_string(
#                 'includes/alert-box.html', context, request=request)

#     data['add_item_form'] = render_to_string(
#         'contents/item/add-item-form.html', context, request=request)

#     return JsonResponse(data)


# def add_item(request):
#     context = {}
#     data = {}

#     warehouses = Warehouse.objects.all()
#     categories = ItemCategory.objects.all()
#     units = ItemUnit.objects.all()
#     random_unique_id = generate_unique_id()

#     context['warehouses'] = warehouses
#     context['categories'] = categories
#     context['units'] = units
#     context['random_unique_id'] = random_unique_id
#     context['table_name'] = "item"
#     context['items'] = Item.objects.all()

#     if request.method == "POST":
#         form = ItemForm(request.POST, request.FILES)

#         if form.is_valid():
#             item = form.save(commit=False)

#             item.save()

#             # Save photos for the item
#             files = request.FILES.getlist('photos')
#             for file in files:
#                 Photo.objects.create(item=item, photo=file)

#             # Create a stock entry for the item
#             quantity = request.POST.get('quantity')
#             last_quantity_added = request.POST.get('last_quantity_added')
#             last_quantity_reduced = request.POST.get('last_quantity_reduced')

#             Stock.objects.create(
#                 item=item,
#                 warehouse=item.warehouse,
#                 quantity=quantity,
#                 last_quantity_added=last_quantity_added,
#                 last_quantity_reduced=last_quantity_reduced
#             )

#             context['alert_message'] = 'Successfully Added an Item'
#             # update context after save
#             context['items'] = Item.objects.all()
#             data['valid'] = True
#             data['item_list'] = render_to_string(
#                 'contents/item/item-list.html', context, request=request)
#             data['alert_box'] = render_to_string(
#                 'includes/alert-box.html', context, request=request)
#         else:
#             print("Form is invalid")
#             print(form.errors)

#     data['add_item_form'] = render_to_string(
#         'contents/item/add-item-form.html', context, request=request)

#     return JsonResponse(data)


# def update_item(request, id):

#     context = {}
#     data = {}

#     single_item = get_object_or_404(Item, id=id)
#     warehouses = Warehouse.objects.all()
#     categories = ItemCategory.objects.all()
#     units = ItemUnit.objects.all()

#     context['single_item'] = single_item
#     context['warehouses'] = warehouses
#     context['categories'] = categories
#     context['units'] = units

#     context['items'] = Item.objects.all()

#     data['valid'] = False
#     data['update_item_form'] = render_to_string(
#         'contents/item/update-item-form.html', context, request=request)

#     if request.method == 'POST':
#         form = ItemForm(request.POST, request.FILES,
#                         instance=single_item)

#         if form.is_valid():
#             form.save()

#             context['items'] = Item.objects.all()
#             context['alert_message'] = 'Successfully Updated a item'

#             data['valid'] = True
#             data['item_list'] = render_to_string(
#                 'contents/item/item-list.html', context, request=request)
#             data['alert_box'] = render_to_string(
#                 'includes/alert-box.html', context, request=request)

#     return JsonResponse(data)

def update_item(request, id):
    context = {}
    data = {}

    single_item = get_object_or_404(Item, id=id)
    warehouses = Warehouse.objects.all()
    categories = ItemCategory.objects.all()
    units = ItemUnit.objects.all()
    # Add this line to get related photos
    photos = Photo.objects.filter(item=single_item)

    context['single_item'] = single_item
    context['warehouses'] = warehouses
    context['categories'] = categories
    context['units'] = units
    context['items'] = Item.objects.all()
    context['photos'] = photos  # Include photos in the context

    data['valid'] = False

    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES, instance=single_item)

        if form.is_valid():
            item = form.save(commit=False)
            item.save()

            # Update photos for the item
            files = request.FILES.getlist('photos')
            if files:
                # Delete existing photos
                Photo.objects.filter(item=item).delete()
                for file in files:
                    Photo.objects.create(item=item, photo=file)

            # Update stock entry for the item
            stock = Stock.objects.get(item=item)
            stock.quantity = request.POST.get('quantity')
            stock.last_quantity_added = request.POST.get('last_quantity_added')
            stock.last_quantity_reduced = request.POST.get(
                'last_quantity_reduced')
            stock.save()

            context['items'] = Item.objects.all()
            context['alert_message'] = 'Successfully Updated an Item'

            data['valid'] = True
            data['item_list'] = render_to_string(
                'contents/item/item-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)

    data['update_item_form'] = render_to_string(
        'contents/item/update-item-form.html', context, request=request)

    return JsonResponse(data)


def delete_item(request, id):

    context = {}
    data = {}

    single_item = get_object_or_404(Item, id=id)

    context['single_item'] = single_item
    context['items'] = Item.objects.all()

    data['valid'] = False
    data['delete_item_form'] = render_to_string(
        'contents/item/delete-item-form.html', context, request=request)

    if request.method == 'POST':
        single_item.delete()

        context['items'] = Item.objects.all()
        context['alert_message'] = 'Successfully Deleted a item'

        data['valid'] = True
        data['item_list'] = render_to_string(
            'contents/item/item-list.html', context, request=request)
        data['alert_box'] = render_to_string(
            'includes/alert-box.html', context, request=request)

    return JsonResponse(data)
