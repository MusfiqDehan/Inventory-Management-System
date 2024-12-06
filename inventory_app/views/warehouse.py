from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator

from ..models import Warehouse
from ..forms import WarehouseForm


# ======================== Warehouse Views ==========================#

def view_warehouse_table(request):
    warehouses = Warehouse.objects.all()
    table_name = "Warehouse"
    paginator = Paginator(warehouses, 5)  # Show 5 items per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'title': 'Inventory',
        'table_name': table_name,
        'warehouses': warehouses,
        'page_obj': page_obj
    }
    return render(request, "contents/all-table/warehouses.html", context)


def add_warehouse(request):
    context = {}
    data = {}

    table_name = "Warehouse"
    warehouses = Warehouse.objects.all()

    context['table_name'] = table_name
    context['warehouses'] = warehouses

    data['valid'] = False
    data['add_warehouse_form'] = render_to_string(
        'contents/warehouse/add-warehouse-form.html', context, request=request)

    if request.method == "POST":
        form = WarehouseForm(request.POST)

        if form.is_valid():
            form.save()
            context['alert_message'] = 'Successfully Added a Warehouse'
            # update context after save
            context['warehouses'] = Warehouse.objects.all()
            data['valid'] = True
            data['warehouse_list'] = render_to_string(
                'contents/warehouse/warehouse-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            print(form.errors)

    return JsonResponse(data)


def update_warehouse(request, id):
    data = dict()
    context = {}

    single_warehouse = Warehouse.objects.get(id=id)

    if request.method == 'POST':
        form = WarehouseForm(request.POST, request.FILES,
                             instance=single_warehouse)

        if form.is_valid():
            form.save()
            warehouses = Warehouse.objects.all()
            context = {
                'warehouses': warehouses,
                'alert_message': 'Successfully Updated a warehouse'
            }
            data['valid'] = True
            data['warehouse_list'] = render_to_string(
                'contents/warehouse/warehouse-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            data['update_warehouse_form'] = render_to_string(
                'contents/warehouse/update-warehouse-form.html', {'single_warehouse': single_warehouse}, request=request)
            data['valid'] = False

    else:
        data['update_warehouse_form'] = render_to_string(
            'contents/warehouse/update-warehouse-form.html', {'single_warehouse': single_warehouse}, request=request)

    return JsonResponse(data)


def delete_warehouse(request, id):
    data = dict()

    single_warehouse = Warehouse.objects.get(id=id)

    if request.method == 'POST':
        single_warehouse.delete()

        warehouses = Warehouse.objects.all()
        context = {
            'warehouses': warehouses,
            'alert_message': 'Successfully Deleted a Warehouse'
        }
        data['valid'] = True
        data['warehouse_list'] = render_to_string(
            'contents/warehouse/warehouse-list.html', context, request=request)
        data['alert_box'] = render_to_string(
            'includes/alert-box.html', context, request=request)
        return JsonResponse(data)

    else:
        data['delete_warehouse_form'] = render_to_string(
            'contents/warehouse/delete-warehouse-form.html', {'single_warehouse': single_warehouse}, request=request)
        return JsonResponse(data)
