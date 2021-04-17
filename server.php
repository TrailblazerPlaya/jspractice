<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);/*Эта команда берет данные, которые пришли с клиента, превращает их в строку и показывает обратно на клиенте */
