<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class StudentAttendance extends Model
    {
        public $timestamps = false;

        protected $table = 'presenza_alunno';

        protected $hidden = [
            'id'
        ];
        public function student() {
            return $this->belongsTo(Student::class, 'alunno');
        }
    }
?>