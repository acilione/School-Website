<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;


    class ExternalAPIsController extends Controller
    {
        public function activitiesIndex()
        {
            return view('activities');
        }
        public function mathAPI(Request $request)
        {
            $equation = $request->equation;
            $url = "http://api.mathjs.org/v4/?expr=$equation";
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $headers = array(
               "Accept: application/json",
            );
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            $resp = curl_exec($curl);
            curl_close($curl);
            echo json_encode($resp);
        }
        public function harvardMuseumAPI(Request $request)
        {
            $apiKey = '6404e7ad-88c2-490c-996e-ef651f664639';
            $url = "https://api.harvardartmuseums.org/gallery?apikey=$apiKey";
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $resp = curl_exec($curl);
            curl_close($curl);
            echo json_encode($resp);
        }
        public function sendGridAPI($email, $visible_password)
        {
            $SENDGRID_API_KEY= env(SENDGRID_API_KEY, "default");
            $curl = curl_init();
            $subject = "WebProgramming 2021 - School Website - auth password"; 
            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.sendgrid.com/v3/mail/send",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\n  \"personalizations\": [\n    {\n      \"to\": [\n        {\n          \"email\": \"$email\"\n        }\n      ],\n      \"subject\": \"$subject\"\n    }\n  ],\n  \"from\": {\n    \"email\": \"liceoscientificogverga21@gmail.com\"\n  },\n  \"content\": [\n    {\n      \"type\": \"text/html\",\n      \"value\": \"La tua password per accedere al sito, non mostrarla a nessuno! $visible_password\"\n    }\n  ]\n}",
                CURLOPT_HTTPHEADER => array(
                    "authorization: Bearer $SENDGRID_API_KEY",
                    "cache-control: no-cache",
                    "content-type: application/json"
                ),
            ));  
            $response = curl_exec($curl);
            $err = curl_error($curl); 
            curl_close($curl);
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
            }
        }
    }
?>