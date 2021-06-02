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

    class InternalAPIController extends Controller
    {
        public function getAllStudents()
        {
            $students = Student::join('classe', 'classe.id', '=', 'alunno.classe')
            ->select('alunno.id', 'cf', 'nome', 'cognome', 'email', 'data_nascita', 'sesso', 'numero', 'sezione')
            ->get();
            echo json_encode($students);
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
            ->where('ruoli_lavoratore.ruolo', 'docente')->get();
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
           ->get();
            echo json_encode($teacher_classes_subjects);
        }
    }
?>