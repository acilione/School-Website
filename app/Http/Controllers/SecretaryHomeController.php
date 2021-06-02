<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use App\Http\Controllers\PasswordController;
    use Illuminate\Http\Request;

    use App\Models\Student;
    use App\Models\StudentAttendance;
    use App\Models\StudentClass;
    use App\Models\Teaching;
    use App\Models\Role;
    use App\Models\Worker;

    class SecretaryHomeController extends Controller
    {
        public function index()
        {
            $loginController = new LoginController();
            return $loginController->checkPageAccessAuth("home_secretary", session()->all(), "worker", "segretario");    
        }
        public function addStudentFormIsValid($post_data) 
        {
            $inputChecks = new InputChecksController();
            if (!$inputChecks->fiscalCodeValid($post_data['cf']) ||
                !$inputChecks->nameValid($post_data['name']) ||
                !$inputChecks->surnameValid($post_data['surname']) ||
                !$inputChecks->emailValid($post_data['email']) ||
                !$inputChecks->classNumValid($post_data['class_num']) ||
                !$inputChecks->classSectionValid($post_data['class_section']) ||
                !$inputChecks->dateValid($post_data['date']) ||
                !$inputChecks->sexValid($post_data['sex'])
                ) {
                    return (false);
                }
            else 
              return (true);
        }
        public function addWorkerFormIsValid($post_data)
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
        public function addStudent(Request $request)
        {
            if(!empty($request->input('cf'))) 
            {
                if (!$this->addStudentFormIsValid($request->all()))
                {
                    echo json_encode('campi non validi!');
                    exit;
                }
                else
                {
                    $password_controller = new PasswordController();
                    $visible_password = $password_controller->randomPassword();
                    $encoded_password = password_hash($visible_password, PASSWORD_DEFAULT);
                    $cf_capitalized = strtoupper($request->input('cf'));
                    $email = $request->input('email');
                    $name = $request->input('name');
                    $surname = $request->input('surname');
                    $class_num = $request->input('class_num');
                    $class_section = $request->input('class_section');
                    $date = $request->input('date');
                    $diff = abs(strtotime($date) - strtotime(date("Y-m-d"))); 
                    $age = floor($diff / (365*60*60*24)); 
                    $sex = $request->input('sex');
                    //trovo id classe corrispondente a numero e sezione inseriti
                    $class = StudentClass::where('numero', $class_num)
                            ->where('sezione', $class_section)->get();
                    if (!count($class))
                    {
                        echo json_encode('classe non valida!');
                        exit;
                    }
                    else
                    {
                        $student = new Student;
                        $student->cf = $cf_capitalized;
                        $student->password = $encoded_password;
                        $student->email = $email;
                        $student->nome = $name;
                        $student->cognome = $surname;
                        $student->data_nascita = $date;
                        $student->eta = $age;
                        $student->classe = $class->first()->id;
                        $student->sesso = $sex;
                        try {
                            $student->save();
                        } catch (\Illuminate\Database\QueryException $e) {
                            echo json_encode($e->errorInfo['2']);
                            exit;
                        }
                        $externalAPIsController = new ExternalAPIsController();
                        $externalAPIsController->sendGridAPI($email, $visible_password);
                        print(json_encode("Alunno inserito correttamente!"));
                    }
                }
            }
            else
                echo json_encode('inserire codice fiscale!');
        }
        public function addWorker(Request $request)
        {
            if(!empty($request->input('cf'))) 
            {
                if (!$this->addWorkerFormIsValid($request->all()))
                {
                    echo json_encode('campi non validi!');
                    exit;
                }
                else
                {
                    $password_controller = new PasswordController();
                    $visible_password = $password_controller->randomPassword();
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
                        $externalAPIsController = new ExternalAPIsController();
                        $externalAPIsController->sendGridAPI($email, $visible_password);
                        print(json_encode("Lavoratore inserito correttamente!"));
                    }
                }
            }
            else
                echo json_encode('inserire codice fiscale!');
        }
        public function modifyStudent(Request $request)
        {
            if(!empty($request->input('cf'))) 
            {
                if (!$this->addStudentFormIsValid($request->all()))
                {
                    echo json_encode('campi non validi!');
                    exit;
                }
                else
                {
                    $id = $request->input('student_id');
                    $cf_capitalized = strtoupper($request->input('cf'));
                    $email = $request->input('email');
                    $name = $request->input('name');
                    $surname = $request->input('surname');
                    $class_num = $request->input('class_num');
                    $class_section = $request->input('class_section');
                    $date = $request->input('date');
                    $diff = abs(strtotime($date) - strtotime(date("Y-m-d"))); 
                    $age = floor($diff / (365*60*60*24));
                    $sex = $request->input('sex');
                    //trovo id classe corrispondente a numero e sezione inseriti
                    $class = StudentClass::where('numero', $class_num)
                            ->where('sezione', $class_section)->get();
                    if (!count($class))
                    {
                        echo json_encode('classe non valida!');
                        exit;
                    }
                    else
                    {
                        $student = Student::find($id);
                        $student->cf = $cf_capitalized;
                        $student->email = $email;
                        $student->nome = $name;
                        $student->cognome = $surname;
                        $student->data_nascita = $date;
                        $student->eta = $age;
                        $student->classe = $class->first()->id;
                        $student->sesso = $sex;
                        try {
                            $student->save();
                        } catch (\Illuminate\Database\QueryException $e) {
                            echo json_encode($e->errorInfo['2']);
                            exit;
                        }
                        print(json_encode("Alunno modificato correttamente!"));
                    }
                }
            }
            else
                echo json_encode('inserire codice fiscale!');
        }
        public function addTeaching(Request $request)
        {
            if (!empty($request->teacher) && 
            !empty($request->class) && 
            !empty($request->subject) &&
            !empty($request->week_day) &&
            !empty($request->time)
            )
            {
                $teaching = new Teaching;
                $teaching->lavoratore =  $request->teacher;
                $teaching->classe =  $request->class;
                $teaching->disciplina =  $request->subject;
                $teaching->giorno_settimana =  $request->week_day;
                $teaching->ora = $request->time;
                try {
                    $teaching->save();
                } catch (\Illuminate\Database\QueryException $e) {
                    echo json_encode($e->errorInfo['2']);
                    exit;
                }
                print(json_encode("Insegnamento inserito correttamente!"));
            }
            else
                print(json_encode('Inserire tutti i campi!'));
        }
    }
?>