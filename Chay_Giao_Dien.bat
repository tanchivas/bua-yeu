@echo off
title Khoi dong Carrot Pen
echo ----------------------------------------------------
echo         KHOI DONG DU AN CARROT PEN - TAN & THAO
echo ----------------------------------------------------
echo.
echo Dang khoi dong Local Server qua Node.js...
echo.
node server.js
if %errorlevel% neq 0 (
    echo.
    echo [LOI] Khong the chay Node.js. Vui long kiem tra xem Node.js da duoc cai dat dung cach chua.
    pause
)
