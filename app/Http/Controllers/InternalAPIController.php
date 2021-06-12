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
    use App\Models\Subject;
    use App\Models\WeekDay;
    use App\Models\Hour;
    use App\Models\StudentGrade;
    use App\Models\StudentClassMessage;

    class InternalAPIController extends Controller
    {
        public function getAllStudents()
        {
            $students = Student::join('classe', 'classe.id', '=', 'alunno.classe')
            ->select('alunno.id', 'cf', 'nome', 'cognome', 'email', 'data_nascita', 'sesso', 'numero', 'sezione')
            ->get();
            echo json_encode($students);
        }
        public function getAllWorkers()
        {
            $workers = Worker::join('ruoli_lavoratore', 'ruoli_lavoratore.id' , '=', 'lavoratore.ruolo')
            ->select('lavoratore.id', 'cf', 'nome', 'cognome', 'email', 'data_nascita', 'eta', 'ruoli_lavoratore.ruolo', 'inizio', 'sesso', 'profile_img')
            ->get();
            echo json_encode($workers);
        }
        public function getAllTeachings()
        {
            $teachings = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
            ->join('classe', 'classe.id', '=', 'insegnamento.classe')
            ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
            ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
            ->join('orari', 'orari.id', '=', 'insegnamento.ora')
            ->select('insegnamento.id', 'cf', 'nome', 'cognome', 'numero', 'sezione', 'nome_disciplina', 'giorno', 'orario')
            ->get();
            echo json_encode($teachings); 
        }
        public function getClassStudents(Request $request)
        {
            if((session()->get('role') === 'docente') && !empty($request->numero) && !empty($request->sezione))
            {
                $class_id = StudentClass::where('numero', $request->numero)
                ->where('sezione', $request->sezione)->first('id')->id;
                $students = StudentClass::find($class_id)->students()->get();
                echo json_encode($students);
            }
        }
        public function getTeachers()
        {
            
           $teachers = Worker::join('ruoli_lavoratore', 'ruoli_lavoratore.id', '=', 'lavoratore.ruolo')
           ->where('ruoli_lavoratore.ruolo', 'docente')
           ->select('lavoratore.id', 'cf', 'nome', 'cognome')->get();
            echo json_encode($teachers);
        }
        public function getClasses()
        {
            $classes = StudentClass::all();
            echo json_encode($classes);
        }
        public function getSubjects()
        {
            $subjects = Subject::all();
            echo json_encode($subjects);
        }
        public function getWeekDays()
        {
            $days = WeekDay::all();
            echo json_encode($days);
        }
        public function getHours()
        {
            $hours = Hour::all();
            echo json_encode($hours);
        }
        public function getTeacherCalendar()
        {
            $calendar = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
            ->join('classe', 'classe.id', '=', 'insegnamento.classe')
            ->join('orari', 'orari.id', '=', 'insegnamento.ora')
            ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
            ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
            ->where('lavoratore.cf', session()->get('cf'))
            ->select('numero as anno', 'sezione', 'nome_disciplina as disciplina', 'giorno as giorno_settimana', 'orario as ora')
            ->orderBy('giorni_settimana.id')
            ->get();
            echo json_encode($calendar);
        }
        public function getTeacherClassesNumbers()
        {
            $teacher_classes_nums = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
            ->join('classe', 'classe.id', '=', 'insegnamento.classe')
            ->where('lavoratore.cf', session()->get('cf'))
            ->select('numero')
            ->groupBy('numero')
            ->get();
            echo json_encode($teacher_classes_nums);
        }
        public function getTeacherClassesSections()
        {
            $teacher_classes_sections = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
            ->join('classe', 'classe.id', '=', 'insegnamento.classe')
            ->where('lavoratore.cf', session()->get('cf'))
            ->select('sezione')
            ->groupBy('sezione')
            ->get();
            echo json_encode($teacher_classes_sections);
        }
        public function getTeacherClassesSubjects(Request $request)
        {
           $class_id = StudentClass::where('numero', $request->numero)
           ->where('sezione', $request->sezione)->first('id')->id;
           $teacher_classes_subjects = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
           ->join('classe', 'classe.id', '=', 'insegnamento.classe')
           ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
           ->where('cf', session()->get('cf'))
           ->where('classe', $class_id)
           ->select('nome_disciplina as disciplina')
           ->groupBy('nome_disciplina')
           ->get();
            echo json_encode($teacher_classes_subjects);
        }
        public function getTeacherStudentAttendances(Request $request)
        {
            $student_attendances = Student::where('cf', $request->student_cf)->first()->attendances()->get();
            echo json_encode($student_attendances);
        }
        public function getStudentSubjectGrades(Request $request)
        {
            $student_cf = $request->student_cf;
            $selected_subject = $request->selected_subject;
            //ottenere voti alunno dati cf e disciplina
            $student_id = Student::where('cf', $student_cf)->first('id')->id;
            $subject_id = Subject::where('nome_disciplina', $selected_subject)->first('id')->id;
            $student_grades = Student::find($student_id)->grades()
            ->where('disciplina' , $subject_id)
            ->join('alunno', 'alunno.id', '=', 'voti_attuali_alunno.alunno')
            ->join('disciplina', 'disciplina.id', '=', 'voti_attuali_alunno.disciplina')
            ->select('voti_attuali_alunno.alunno as alunno', 'alunno.nome', 'alunno.cognome', 'voti_attuali_alunno.voto', 'disciplina.nome_disciplina as disciplina', 'voti_attuali_alunno.data', 'voti_attuali_alunno.tipologia_voto')
            ->get();
            echo json_encode($student_grades);
        }
        public function getClassMessages()
        {
            $class_id = session()->get('class_id');
            $msgs = StudentClassMessage::join('alunno', 'alunno.id', '=', 'messaggi_studenti.id_studente')
            ->where('id_classe', $class_id)
            ->select('nome', 'cognome', 'testo_messaggio', 'created_at as post_timestamp')
            ->orderBy('post_timestamp')
            ->get();
            echo json_encode($msgs);
        }
        public function getStudentCalendar()
        {
            $calendar = StudentClass::where('id', session()->get('class_id'))->first()->teachings()
            ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
            ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
            ->join('orari', 'orari.id', '=', 'insegnamento.ora')
            ->select('nome_disciplina', 'giorno as giorno_settimana', 'orario as ora')
            ->orderBy('giorni_settimana.id')
            ->get(); 
            echo json_encode($calendar);
        }
        public function getStudentAttendances(Request $request)
        {
            $from_date = $request->from_date;
            $to_date = $request->to_date;
            $student = Student::where('cf', session()->get('cf'))->first();
            $studentAttendances = $student->attendances()
            ->where('data', '>=', $from_date)
            ->where('data', '<=', $to_date)
            ->get(['data', 'presenza']);
            echo json_encode($studentAttendances);
        }
        public function getStudentGrades(Request $request)
        {   
            $from_date = $request->from_date;
            $to_date = $request->to_date;
            $student = Student::where('cf', session()->get('cf'))->first();
            $studentGrades = $student->grades()
            ->join('disciplina', 'disciplina.id', '=', 'voti_attuali_alunno.disciplina')
            ->where('data', '>=', $from_date)
            ->where('data', '<=', $to_date)
            ->get(['data', 'nome_disciplina', 'voto', 'tipologia_voto']);
            echo json_encode($studentGrades);
        }
    }
?>