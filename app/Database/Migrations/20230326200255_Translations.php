<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Translations extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true
            ],
            'code' => [
                'type' => 'VARCHAR',
                'constraint' => 64,
                'null' => false
            ],
            'value' => [
                'type' => 'VARCHAR',
                'constraint' => 256,
                'null' => true
            ],
            'lang' => [
                'type' => 'VARCHAR',
                'constraint' => 5,
                'null' => false,
            ],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('translations');
    }

    public function down()
    {
        $this->forge->dropTable('translations');
    }
}