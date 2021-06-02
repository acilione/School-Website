<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class StudentGrade extends Model
    {
        public $timestamps = false;

        protected $table = 'voti_attuali_alunno';

        protected $hidden = [
            'id'
        ];
        public function student() {
            return $this->belongsTo(Student::class, 'alunno');
        }
    }
?>