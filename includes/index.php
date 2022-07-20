<?php 

// $ContactKey = "tn_JohnSmith@gmail.com";
// $SubscriberKey = "tn_JohnSmith@gmail.com";
// $Created_Date = "5/2/2022 2:53:19 PM";
// $NewsletterApproved = 'true';
// $EmailAddress = "test@test.com";
// $First_Name = "John";
// $Last_Name = "Smith";
// $Phone = "972521234567";
// $URL = "https://landing-page-media.co.il/lp/tnuva/shavuot/dishes/?id=_499_436_509_589_576_585";

// $ContactKey = $_POST['ContactKey'];
// $Phone = $_POST['mobile'];
// $First_Name = $_POST['firstname'];
// $Last_Name = $_POST['lastname'];
// $URL = $_POST['urlForDishes'];
// $NewsletterApproved = $_POST['NewsletterApproved'];

// $SubscriberKey = "tn_JohnSmith@gmail.com";
// $EmailAddress = "JohnSmith@gmail.com";
// $Created_Date = "5/2/2022 2:53 PM";
// $Interest_1 = "1a";
// $Interest_2 = "2a";
// $Interest_3 = "3a";
// $Interest_4 = "4a";
// $Interest_5 = "5a";
// $Interest_6 = "6a";
// $Interest_7 = "7a";
// $Difficulty = "8a";

$SubscriberKey = $_POST['ContactKey'];
$EmailAddress = $_POST['email'];
$Created_Date = $_POST['Created_Date'];
$Interest_1 = $_POST['Interest_1'];
$Interest_2 = $_POST['Interest_2'];
$Interest_3 = $_POST['Interest_3'];
$Interest_4 = $_POST['Interest_4'];
$Interest_5 = $_POST['Interest_5'];
$Interest_6 = $_POST['Interest_6'];
$Interest_7 = $_POST['Interest_7'];
$Difficulty = $_POST['Difficulty'];
$Difficulty2 = $_POST['Difficulty2'];
$Difficulty3 = $_POST['Difficulty3'];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://mcgxyy9fs-qckx1drx87pkdskcfq.auth.marketingcloudapis.com/v2/token',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
"grant_type": "client_credentials",
"client_id": "e8gf2hehxr3jq7eghxo8kqeu",
"client_secret": "5BdUZ8XYlHbXpkwfjGX2usvO",
"account_id": "510000708"
}
',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
// echo explode('"',$response)[3];



$curl2 = curl_init();

curl_setopt_array($curl2, array(
  CURLOPT_URL => 'https://mcgxyy9fs-qckx1drx87pkdskcfq.rest.marketingcloudapis.com/hub/v1/dataevents/key:1F18BC2C-DD0E-4B89-8125-56F6EB51F481/rowset',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'[
    {
        "keys": {
            "SubscriberKey": "'.$SubscriberKey.'"
        },
        "values": {
            "Email_Address": "'.$EmailAddress.'",
            "Interest_1": "'.$Interest_1.'",
            "Interest_2": "'.$Interest_2.'",
	        "Interest_3": "'.$Interest_3.'",
            "Interest_4": "'.$Interest_4.'",
            "Interest_5": "'.$Interest_5.'",
            "Interest_6": "'.$Interest_6.'",
            "Interest_7": "'.$Interest_7.'",
            "Difficulty": "'.$Difficulty.'",
            "Difficulty2": "'.$Difficulty2.'",
            "Difficulty3": "'.$Difficulty3.'",
            "Created_Date": "'.$Created_Date.'"
        }
    }
]

',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Bearer '.explode('"',$response)[3]
  ),
));

$response2 = curl_exec($curl2);

curl_close($curl2);
echo $response2;
