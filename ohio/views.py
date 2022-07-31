from django.shortcuts import render
from .models import CardDet


# Create your views here.

def home(request):
    return render(request, "ohio/home.html")


def about(request):
    return render(request, "ohio/about.html")


def location(request):
    return render(request, "ohio/location.html")


def contact(request):
    return render(request, "ohio/contact.html")


def menu(request):
    return render(request, "ohio/menu.html")


def cart(request):
    if request.method == "POST":
        card_details = CardDet()
        card_details.cardNumber = request.POST['cardNumber']
        card_details.expiryDate = request.POST['expiryDate']
        card_details.cvv = request.POST['cvv']
        card_details.save()
        return render(request, "ohio/cart.html")
    return render(request, "ohio/cart.html")