<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Teaching extends Model
    {
        public $timestamps = false;

        protected $table = 'insegnamento';

        public function teacher() {
            return $this->belongsTo(Worker::class, 'lavoratore');
        }
        public function subject() {
            return $this->belongsTo(Subject::class, 'disciplina');
        }
        public function weekDay() {
            return $this->belongsTo(WeekDay::class, 'giorno_settimana');
        }
        public function hour() {
            return $this->belongsTo(Hour::class, 'ora');
        }
        public function class() {
            return $this->belongsTo(StudentClass::class, 'classe');
        }
    }
?>