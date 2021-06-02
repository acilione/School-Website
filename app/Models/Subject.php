<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use App\Models\Teaching;

    class Subject extends Model
    {
        public $timestamps = false;

        protected $table = 'disciplina';

        public function teachings() {
            return $this->hasMany(Teaching::class, 'disciplina');
        }
    }
?>