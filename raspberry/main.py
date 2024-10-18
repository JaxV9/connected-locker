from machine import Pin, PWM
from servo import Servo
import time
import network
import urequests
import json

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid = 'PoleDeVinci_Private'
password = 'Creatvive_Lab_2024'
wlan.connect(ssid, password)
Locker_id= 1
url = f"https://directus-ucmn.onrender.com/items/locker/{Locker_id}"

motor = Servo(16)
button = Pin(17, mode=Pin.IN, pull=Pin.PULL_UP)
red = Pin(27, Pin.OUT)
blue = Pin(22, Pin.OUT)
green = Pin(26, Pin.OUT)
while not wlan.isconnected():
    print('noco')
    time.sleep(1)
open = False

while True:

    if open == True:
        green.value(0)
        red.value(1)
        blue.value(1)
    else:
        green.value(1)
        red.value(0)
        blue.value(1)

    if button.value() == 0:
        print(button.value())

        try:
            print("GET")

            r = urequests.get(url)

            print(r.json())
            response = r.json()
            print(response['data']['status'])
            print(type(response['data']['status']))
            if response['data']['status'] == True:
                motor.move(90)
                open = True
                time.sleep(0.8)
            else:
                motor.move(0)
                open = False

            r.close()
            time.sleep(1)
        except Exception as e:
            print(e)
    time.sleep(.1)



