<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use App\Http\Controllers\InpuChecksController;
    use Illuminate\Http\Request;
    use \Illuminate\Database\QueryException;

    use App\Models\Circular;

    class PrincipalHomeController extends Controller
    {
        public function index()
        {
            $loginController = new LoginController();
            return $loginController->checkPageAccessAuth("home_principal", session()->all(), "worker", "preside");    
        }
        public function addCircular(Request $request)
        {
            
            if (!empty($request->input('circular_date')) && !empty($request->input('circular_title')) && !empty($request->input('circular_content')))
            {   
                $inputChecks = new InputChecksController();
                if ($inputChecks->dateValid($request->input('circular_date')))
                {
                    $circular = new Circular;
                    $circular->data = $request->circular_date;
                    $circular->titolo = $request->circular_title;
                    $circular->contenuto = $request->circular_content;
                    try {
                        $circular->save();
                    } catch (QueryException $e) {
                        echo json_encode($e->errorInfo['2']);
                        exit;
                    }
                    echo json_encode('Circolare inserita correttamente!');
                }
                else 
                    echo json_encode('Inserire una data valida!');
            }
            else
                echo json_encode('Riempire tutti i campi!');
        }
    }
?>