<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <title>Breakout</title>
</head>
<body>
    <?php
        include 'BreakoutGet.php';
    ?>
<div class="all">
<div class="menu">
    <div class="main"><a href="\index.php">Главная</a></div>
    <div class="tetris"><a href="\Tetris\TetrisIndex.php">Tetris</a></div>
    <div class="snake"><a href="\snake\SnakeIndex.php">Snake</a></div>
    <div class="break"><a href="\breakout\BreakoutIndex.php">Breakout</a></div>
    <div class="records"><a href="\records\index1.php">Рекорды</a></div>
    <div class="info">Посвящается
        Стиву
        Возняку
         </div>
</div>
<div class="field">
<div id="send" class="container1">
        <form>
            <p>Новый рекорд!</p>
            <p>Введите имя:</p>
            <input id="nname" name="nickname">
            <button id="button">Отправить</button>
        </form>
</div>

<canvas id="can" class="container2" width="500" height="400"></canvas>

<div class="start">
    <div class="score">Score:<span id="score"></span></div>
    <div class="play"><button onclick="Start()">Play!</button></div>
    <div id="min" style="opacity:0"></div>
    <div id="minID" style="opacity:0"></div>
</div>
</div>
<script>
    min='<?php echo $min;?>'
    minID='<?php echo $minID;?>'
    var minContainer=document.getElementById('min');
    var minIDContainer=document.getElementById('minID')
    minContainer.innerHTML=min;
    minIDContainer.innerHTML=minID;
    
</script>
<script src="script.js"></script>
</body>
</html>