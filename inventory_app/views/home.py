from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.core.paginator import Paginator


def index(request):
    context = {}
    return render(request, "contents/dashboard.html", context)


def view_dashboard(request):
    context = {
        'title': 'Dashboard'
    }
    return render(request, "contents/dashboard.html", context)


def view_calender(request):
    context = {
        'title': 'Calendar'
    }
    return render(request, "contents/calendar.html", context)
