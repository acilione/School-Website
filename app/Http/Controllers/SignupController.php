<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Session;

    use App\Models\Student;
    use App\Models\Worker;
    use App\Models\Role;
    
    class SignupController extends Controller
    {
        public function index()
        {
            return view('signup');
        }
        public function signupFormIsValid($post_data)
        {
            $inputChecks = new InputChecksController();
            if (!$inputChecks->fiscalCodeValid($post_data['cf']) ||
                !$inputChecks->nameValid($post_data['name']) ||
                !$inputChecks->surnameValid($post_data['surname']) ||
                !$inputChecks->emailValid($post_data['email']) ||
                !$inputChecks->dateValid($post_data['date']) ||
                !$inputChecks->sexValid($post_data['sex']) ||
                !$inputChecks->dateValid($post_data['beginning_date']) ||
                ($post_data['role'] !== 'docente' && $post_data['role'] !== 'segretario' && $post_data['role'] !== 'preside')
                ) {
                    return (false);
                }
            else 
              return (true);
        }
        public function signup(Request $request)
        {
            if(!empty($request->input('cf'))) 
            {
                if (!$this->signupFormIsValid($request->all()))
                {
                    echo json_encode('campi non validi!');
                    exit;
                }
                else
                {
                    $visible_password = $request->password;
                    $encoded_password = password_hash($visible_password, PASSWORD_DEFAULT);
                    $cf_capitalized = strtoupper($request->input('cf'));
                    $email = $request->input('email');
                    $name = $request->input('name');
                    $surname = $request->input('surname');
                    $date = $request->input('date');
                    $diff = abs(strtotime($date) - strtotime(date("Y-m-d"))); 
                    $age = floor($diff / (365*60*60*24)); 
                    $sex = $request->input('sex');
                    $role_inserted =  $request->input('role');
                    $beginning_date = $request->input('beginning_date');
                    $profile_img = $request->input('profile_img');
                    $role = Role::where('ruolo', $role_inserted)->get();
                    if (!count($role))
                    {
                        echo json_encode('ruolo non valido!');
                        exit;
                    }
                    else
                    {
                        $worker = new Worker;
                        $worker->cf = $cf_capitalized;
                        $worker->password = $encoded_password;
                        $worker->email = $email;
                        $worker->nome = $name;
                        $worker->cognome = $surname;
                        $worker->data_nascita = $date;
                        $worker->eta = $age;
                        $worker->ruolo = $role->first()->id;
                        $worker->sesso = $sex;
                        $worker->inizio = $beginning_date;
                        $worker->profile_img = $profile_img;
                        try {
                            $worker->save();
                        } catch (\Illuminate\Database\QueryException $e) {
                            echo json_encode($e->errorInfo['2']);
                            exit;
                        }
                        print(json_encode("Lavoratore inserito correttamente!"));
                    }
                }
            }
            else
                echo json_encode('inserire codice fiscale!');
        }
    }
?>