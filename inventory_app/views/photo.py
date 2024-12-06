from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator

from ..models import Item, Photo
from ..forms import PhotoForm


# ======================== Photo Views ==========================#

def view_photo_table(request):

    photos = Photo.objects.all()
    table_name = "Photo"
    context = {
        'table_name': table_name,
        'photos': photos
    }
    return render(request, "contents/all-table/photos.html", context)


def get_item_photos(request):
    item_id = request.GET.get('item_id')
    photos = Photo.objects.filter(item_id=item_id)
    photo_data = [{'url': photo.photo.url} for photo in photos]
    return JsonResponse({'photos': photo_data})


def add_photo(request):
    context = {}
    data = {}

    items = Item.objects.all()
    context['items'] = items
    context['table_name'] = "Photo"
    context['photos'] = Photo.objects.all()

    if request.method == "POST":
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            context['alert_message'] = 'Successfully Added a Photo'
            data['valid'] = True
            data['photo_list'] = render_to_string(
                'contents/photo/photo-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)
        else:
            data['valid'] = False
            data['errors'] = form.errors

    data['add_photo_form'] = render_to_string(
        'contents/photo/add-photo-form.html', context, request=request)

    return JsonResponse(data)


def update_photo(request, id):

    context = {}
    data = {}

    items = Item.objects.all()
    single_photo = get_object_or_404(Photo, id=id)

    context['items'] = items
    context['table_name'] = "Photo"
    context['photos'] = Photo.objects.all()
    context['single_photo'] = single_photo

    data['valid'] = False
    data['update_photo_form'] = render_to_string(
        'contents/photo/update-photo-form.html', context, request=request)

    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES,
                         instance=single_photo)

        if form.is_valid():
            form.save()

            context['photos'] = Photo.objects.all()
            context['single_photo'] = single_photo
            context['alert_message'] = 'Successfully Updated a Photo'

            data['valid'] = True
            data['photo_list'] = render_to_string(
                'contents/photo/photo-list.html', context, request=request)
            data['alert_box'] = render_to_string(
                'includes/alert-box.html', context, request=request)

    return JsonResponse(data)


def delete_photo(request, id):

    context = {}
    data = {}

    single_photo = get_object_or_404(Photo, id=id)

    context['single_photo'] = single_photo
    context['photos'] = Photo.objects.all()

    data['valid'] = False
    data['delete_photo_form'] = render_to_string(
        'contents/photo/delete-photo-form.html', context, request=request)

    if request.method == 'POST':
        single_photo.delete()

        context['photos'] = Photo.objects.all()
        context['alert_message'] = 'Successfully Deleted a photo'

        data['valid'] = True
        data['photo_list'] = render_to_string(
            'contents/photo/photo-list.html', context, request=request)
        data['alert_box'] = render_to_string(
            'includes/alert-box.html', context, request=request)

    return JsonResponse(data)
