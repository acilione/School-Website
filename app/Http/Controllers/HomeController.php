<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;

    use App\Models\Circular;
    use App\Models\Building;
    use App\Models\Teaching;
    use App\Models\Worker;

    class HomeController extends Controller {

        public function listCirculars() {
            return Circular::all();
        }
        public function listBuildings() {
            return Building::all();
        }
        public function listActiveTeachers() {
            $teachings = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
                ->join('classe', 'classe.id', '=', 'insegnamento.classe')
                ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
                ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
                ->select('cf', 'nome', 'cognome', 'profile_img', 'nome_disciplina')
                ->get();
            return $teachings;
        }
        public function listSearchResult(Request $request) {
            $filterValue = $request->input('filterValue');
            $searchValue = $request->input('searchValue');
            if ($filterValue === 'circolari')
            {
                $circular = new Circular();
                return $circular->filteredCirculars($searchValue);
            }
            else if ($filterValue === 'docenti')
            {
                $filtered_teachings = Teaching::join('lavoratore', 'lavoratore.id', '=', 'insegnamento.lavoratore')
                ->join('classe', 'classe.id', '=', 'insegnamento.classe')
                ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
                ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
                ->select('nome', 'cognome', 'profile_img', 'nome_disciplina')
                ->where('nome', 'like', '%'.$searchValue.'%')
                ->orWhere('cognome', 'like', '%'.$searchValue.'%')   
                ->get();
                return $filtered_teachings;
            }
        }
        public function showHomepage() {
           return view('home');
        }
    }
?>