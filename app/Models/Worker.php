<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use App\Models\Teaching;

    class Worker extends Model
    {
        public $timestamps = false;

        protected $table = 'lavoratore';

        protected $hidden = [
            'password',
            'created_at'
        ];
        public function teachings() {
            return $this->hasMany(Teaching::class, 'lavoratore');   
        }
        public function role() {
            return $this->belongsTo(Role::class, 'ruolo');
        }
    }
?>