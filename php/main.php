<?php
session_start();
$host = "localhost";
$user = "root";
$password = "";
$database = "systemmechanikowy";
$conn = mysqli_connect($host, $user, $password, $database);
function login($username, $password)
{
    global $conn;
    $_SESSION["sessionstatus"] = 0;
    $_SESSION["id_osoba"] = 0;
    $query = $conn->prepare("SELECT id_osoba FROM osoba WHERE nazwa=? AND haslo=PASSWORD(?)");
    $query->bind_param("ss", $username, $password);
    $query->execute();
    $result = $query->get_result();
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $_SESSION["sessionstatus"] = 1;
        $_SESSION["id_osoba"] = $row["id_osoba"];
        if ($_SESSION["id_osoba"] == 1) {
            $_SESSION["mode"] = "w";
            $_SESSION["idmode"] = 0;
            header("Location: /wlasciciel/");
            exit();
        } else {
            $query2 = $conn->prepare("select m.id_mechanik as mechanik, k.id_klient as klient, id_osoba from osoba left join mechanik as m on m.osoba_id=id_osoba left join klient as k on k.osoba_id=id_osoba where id_osoba=(?)");
            $query2->bind_param("s", $_SESSION["id_osoba"]);
            $query2->execute();
            $result2 = $query2->get_result();
            if ($result2->num_rows == 1) {
                $row2 = $result2->fetch_assoc();
                if ($row2["mechanik"] != null && $row2["klient"] != null) {
                    echo "Błąd (osoba jest przypisana do dwóch funkcji)";
                } elseif ($row2["mechanik"] != null) {
                    $_SESSION["mode"] = "m";
                    $_SESSION["idmode"] = $row2["mechanik"];
                    header("Location: /mechanik/");
                    exit();
                } elseif ($row2["klient"] != null) {
                    $_SESSION["mode"] = "k";
                    $_SESSION["idmode"] = $row2["klient"];
                    header("Location: /klient/");
                    exit();
                } else {
                    echo "Błąd (osoba nie jest przypisana)";
                }
            } else {
                echo "Błąd (wiele rekordów)";
            }
        }
    } else {
        echo "Zła nazwa użytkownika i/lub hasło";
    }
    $query->close();
}
function checklogin($mode)
{
    if (!($_SESSION["sessionstatus"] == 1 && $_SESSION["mode"] == $mode)) {
        header("Location: /");
        echo $_SESSION["mode"];
        exit();
    }
}
function getOsoba()
{
    global $conn;
    $id = ($_SESSION["mode"] == "w") ? "" : "=" . $_SESSION['id_osoba'];
    $query = $conn->prepare("select id_osoba, imie, nazwisko, dataUr, nrTel, plec, nazwa from osoba where id_osoba$id");
    $query->execute();
    $result = $query->get_result();
    $arr = array();
    while ($row = $result->fetch_assoc())
        $arr[] = $row;
    echo json_encode($arr);
}
function setOsoba($imie, $nazwisko, $dataur, $nrtel, $plec, $username, $password)
{
    global $conn;
    $query = $conn->prepare("insert into osoba (imie, nazwisko, dataur, nrtel, plec, nazwa, haslo) values (?, ?, ?, ?, ?, ?, password(?))");
    $query->bind_param("sssidss", $imie, $nazwisko, $dataur, $nrtel, $plec, $username, $password);
    $query->execute();
    $query->close();
    $query2 = $conn->prepare("select id_osoba from osoba where nazwa=?");
    $query2->bind_param("s", $username);
    $query2->execute();
    $result = $query2->get_result();
    $row = $result->fetch_assoc();
    $query3 = $conn->prepare("insert into klient (osoba_id, pieniadzewgroszach) values (?, 0)");
    $query3->bind_param("i", $row["id_osoba"]);
    $query3->execute();
    $query3->close();
    echo json_encode(true);

}
function setUpdOsoba($imie, $nazwisko, $dataur, $nrtel, $plec, $username, $password, $id = null)
{
    if (!isset($id)) {
        $id = $_SESSION["id_osoba"];
    } elseif ($_SESSION["mode"] != "w") {
        echo "Brak uprawnień";
        exit();
    }
    global $conn;
    $query = $conn->prepare("update osoba set imie=?, nazwisko=?, dataur=?, nrtel=?, plec=?, nazwa=?, haslo=password(?) where id_osoba=?");
    $query->bind_param("ssssdssi", $imie, $nazwisko, $dataur, $nrtel, $plec, $username, $password, $id);
    $query->execute();
    echo json_encode(true);
}
function getKlient()
{
    global $conn;
    $id = ($_SESSION["mode"] == "w") ? "" : "=" . $_SESSION['id_osoba'];
    $query = $conn->prepare("select id_klient, pieniadzewgroszach from klient where osoba_id$id");
    $query->execute();
    $result = $query->get_result();
    $arr = array();
    while ($row = $result->fetch_assoc())
        $arr[] = $row;
    echo json_encode($arr);
}
function setRPieniadze($count, $id = null)
{
    global $conn;
    if (!isset($id)) {
        $id = $_SESSION["id_osoba"];
    } elseif ($_SESSION["mode"] != "w") {
        echo "Brak uprawnień";
        exit();
    }
    $query = $conn->prepare("update klient set pieniadzewgroszach=? where id_osoba=?");
    $query->bind_param("ii", $id);
    $query->execute();
    $query->close();
    echo json_encode(true);
}

function setUpdPieniadze($count, $id = null)
{
    global $conn;
    if (!isset($id)) {
        $id = $_SESSION["id_osoba"];
    } elseif ($_SESSION["mode"] != "w") {
        echo "Brak uprawnień";
        exit();
    }
    $query = $conn->prepare("update klient set pieniadzewgroszach=pieniadzewgroszach+? where osoba_id=?");
    $query->bind_param("ii", $count, $id);
    $query->execute();
    $query->close();
    echo json_encode(true);
}
function getCountSamochod() //id
{
    global $conn;
    $id = ($_SESSION["mode"] == "w") ? "" : "=" . $_SESSION['idmode'];
    $query = $conn->prepare("select id_samochod from samochod where id_wlasciciel$id");
    $query->execute();
    $result = $query->get_result();
    echo json_encode($result->num_rows);
}
function getSamochod()
{
    global $conn;
    $id = ($_SESSION["mode"] == "w") ? "" : "=" . $_SESSION['idmode'];
    $query = $conn->prepare("select id_samochod, marka, rocznik, przebwcm, model, rejestracja, status from samochod where id_wlasciciel$id");
    $query->execute();
    $result = $query->get_result();
    $arr = array();
    while ($row = $result->fetch_assoc())
        $arr[] = $row;
    echo json_encode($arr);
}
function setSamochod($marka, $rocznik, $przebiegwcm, $model, $rejestracja, $status)
{
    global $conn;
    $query = $conn->prepare("insert into samchod (id_wlasciciel, marka, rocznik, przebwcm, model, rejestracja, status) values (?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("isiisss", $_SESSION["idmode"], $marka, $rocznik, $przebiegwcm, $model, $rejestracja, $status);
    $query->execute();
    echo json_encode(true);
}
function removeSamochod($id)
{
    global $conn;
    // if (!isset($id)) {
    //     $id=$_SESSION["id_osoba"];
    // } elseif ($_SESSION["mode"]!="w") {
    //     echo "Brak uprawnień";
    //     exit();
    // }
    $query = $conn->prepare("delete from samochod where id_samochod=?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->close();
    echo json_encode(true);
}
function getMechanik()
{
    global $conn;
    $id = ($_SESSION["mode"] == "w") ? "" : "=" . $_SESSION['id_osoba'];
    $query = $conn->prepare("select id_mechanik, wyplatawgroszach, datazatrudnienia, wykrsztalcenie, etat from mechanik where id_osoba$id");
    $query->execute();
    $result = $query->get_result();
    $arr = array();
    while ($row = $result->fetch_assoc())
        $arr[] = $row;
    echo json_encode($arr);
}



function test($a = 1, $b = 2)
{
    $sum = $a + $b;
    echo json_encode($sum);
}
if (isset($_POST["func"])) {
    if (isset($_POST["vars"])) {
        $vars = json_decode($_POST["vars"]);
        call_user_func_array($_POST["func"], $vars);
    } else {
        $_POST["func"]();
    }
}