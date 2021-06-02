<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;
    use App\Models\Teaching;

    class Hour extends Model
    {
        public $timestamps = false;

        protected $table = 'orari';

        public function teachings() {
            return $this->hasMany(Teaching::class, 'ora');
        }
    }
?>