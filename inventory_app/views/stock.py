from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator

from ..models import Warehouse, Stock, Item
from ..forms import StockForm


# ======================== Stock Views ==========================#

def view_stock_table(request):

    stocks = Stock.objects.all()
    table_name = "Stock"
    context = {
        'table_name': table_name,
        'stocks': stocks
    }
    return render(request, "contents/all-table/stocks.html", context)


def add_stock(request):

    context = {}
    data = {}

    items = Item.objects.all()
    warehouses = Warehouse.objects.all()

    context['items'] = items
    context['warehouses'] = warehouses

    context['table_name'] = "stock"
    context['stocks'] = Stock.objects.all()

    data['valid'] = False
    data['add_stock_form'] = render_to_string(
        'contents/stock/add-stock-form.html', context, request=request)

    if request.method == "POST":
        form = StockForm(request.POST)

        if form.is_valid():
            form.save()

            context['alert_message'] = 'Successfully Added a stock'
            # update context after save
            context['stocks'] = Stock.objects.all()
            context['items'] = items
            context['warehouses'] = warehouses

            data['valid'] = True
            data['stock_list'] = render_to_string(
                'contents/stock/stock-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)

    return JsonResponse(data)


def update_stock(request, id):

    context = {}
    data = {}

    single_stock = get_object_or_404(Stock, id=id)
    warehouses = Warehouse.objects.all()
    items = Item.objects.all()

    context['single_stock'] = single_stock
    context['items'] = items
    context['warehouses'] = warehouses

    context['stocks'] = Stock.objects.all()

    data['valid'] = False
    data['update_stock_form'] = render_to_string(
        'contents/stock/update-stock-form.html', context, request=request)

    if request.method == 'POST':
        form = StockForm(request.POST, request.FILES,
                         instance=single_stock)

        if form.is_valid():
            form.save()

            context['stocks'] = Stock.objects.all()
            context['alert_message'] = 'Successfully Updated a stock'

            data['valid'] = True
            data['stock_list'] = render_to_string(
                'contents/stock/stock-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)

    return JsonResponse(data)


def delete_stock(request, id):

    context = {}
    data = {}

    single_stock = get_object_or_404(Stock, id=id)

    context['single_stock'] = single_stock
    context['stocks'] = Stock.objects.all()

    data['valid'] = False
    data['delete_stock_form'] = render_to_string(
        'contents/stock/delete-stock-form.html', context, request=request)

    if request.method == 'POST':
        single_stock.delete()

        context['stocks'] = Stock.objects.all()
        context['alert_message'] = 'Successfully Deleted a stock'

        data['valid'] = True
        data['stock_list'] = render_to_string(
            'contents/stock/stock-list.html', context, request=request)
        data['alert_box'] = render_to_string(
            'includes/alert-box.html', context, request=request)

    return JsonResponse(data)
