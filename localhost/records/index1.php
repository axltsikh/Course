<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="styel.css">
    <script src="script.js"></script>
    <title>Рекорды</title>
</head>
<body bgcolor="black">
<div class="all">
<div class="menu">
    <div class="main"><a href="\index.php">Главная</a></div>
    <div class="tetris"><a href="\Tetris\TetrisIndex.php">Tetris</a></div>
    <div class="snake"><a href="\snake\SnakeIndex.php">Snake</a></div>
    <div class="break"><a href="\breakout\BreakoutIndex.php">Breakout</a></div>
    <div class="records"><a href="\records\index1.php">Рекорды</a></div>
    <div class="info">TEXT</div>
</div>

<div class="container1">
    <table>
        <tr>
            <td class="TableName">Tetris</td>
        </tr>
        <?php
            $link =new mysqli("localhost","root","naziwin","records");
            if($link->connect_error){
             die("Ошибка: " . $link->connect_error);
            }
            
            $value = $link->query(" SELECT * FROM tetris ORDER BY points DESC");
            
            foreach($value as $row){
                echo "<tr>";
                    echo"<td>" . $row["Name"] . "</td>";
                    echo"<td>" . $row["Points"] . "</td>";
                    
                echo "</tr>";
            }
        ?>
    </table>
</div>
<div class="container">
    <table>
        <tr>
            <td class="TableName">Snake</td>
        </tr>
        <?php
            $link =new mysqli("localhost","root","naziwin","records");
            if($link->connect_error){
             die("Ошибка: " . $link->connect_error);
            }
            $value = $link->query(" SELECT * FROM snake ORDER BY points DESC");
            
            foreach($value as $row){
                echo "<tr>";

                    echo"<td>" . $row["Name"] . "</td>";
                    echo"<td>" . $row["Points"] . "</td>";
                echo "</tr>";
            }
        ?>
    </table>
</div>
<div class="container">
    <table>
        <tr>
            <td class="TableName">Breakout</td>
        </tr>
        <?php
            $link =new mysqli("localhost","root","naziwin","records");
            if($link->connect_error){
             die("Ошибка: " . $link->connect_error);
            }
            $value = $link->query(" SELECT * FROM breakout ORDER BY points DESC");
            
            foreach($value as $row){
                echo "<tr>";

                    echo"<td>" . $row["Name"] . "</td>";
                    echo"<td>" . $row["Points"] . "</td>";
                echo "</tr>";
            }
        ?>
    </table>
</div>
</div>
</body>
</html>