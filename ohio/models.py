from django.db import models


# Create your models here.
class CardDet(models.Model):
    cardName = models.TextField()
    cardNumber = models.TextField()
    cvv = models.TextField()
    expiryDate = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cardName
