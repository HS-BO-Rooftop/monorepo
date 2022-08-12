FROM python:3.10
WORKDIR /usr/src
RUN mkdir -p /usr/src/config

ADD ./config/* /usr/src/config
COPY ./docker/proxy/requirements.txt /usr/src/
COPY ./client.py /usr/src
COPY ./utils.py /usr/src

RUN pip install -r requirements.txt
CMD ["/bin/sh", "-c", "python -u /usr/src/client.py > server.log 2>&1"]
