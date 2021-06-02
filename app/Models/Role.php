<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use App\Models\Teaching;

    class Role extends Model
    {
        public $timestamps = false;

        protected $table = 'ruoli_lavoratore';

        public function workers() {
            return $this->hasMany(Worker::class, 'ruolo');
        }
    }
?>