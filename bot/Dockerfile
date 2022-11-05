FROM python:3.8-slim

COPY ./ /clubcall
WORKDIR /clubcall

RUN pip3 install --upgrade -r requirements.txt

CMD ["python3", "bot.py"]