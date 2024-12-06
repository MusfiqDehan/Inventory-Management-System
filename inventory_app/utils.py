# utils.py
import uuid
import barcode
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from barcode.writer import ImageWriter


def generate_unique_id():
    return str(uuid.uuid4().int)[:12]


def generate_barcode_image(data):
    ean = barcode.get('ean13', data, writer=ImageWriter())
    buffer = BytesIO()
    ean.write(buffer)
    return ContentFile(buffer.getvalue(), name=f'{data}.png')


def generate_qrcode_image(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    return ContentFile(buffer.getvalue(), name=f'{data}.png')
