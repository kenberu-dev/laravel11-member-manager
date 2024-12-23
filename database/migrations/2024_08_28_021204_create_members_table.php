<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sex');
            $table->foreignId('office_id')->constrained('offices')->onDelete('cascade');
            $table->string('status');
            $table->string('characteristics');
            $table->string('document_url')->nullable();
            $table->string('beneficiary_number')->length(10)->nullable();
            $table->date('started_at')->nullable();
            $table->date('update_limit')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
