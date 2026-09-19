@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Categorias</h1>

        <p>Escolha uma categoria:</p>

        @foreach ($categorias as $categoria)
            <div style="margin-bottom: 15px;">
                <h3>{{ $categoria->nome }}</h3>

                @if ($categoria->descricao)
                    <p>{{ $categoria->descricao }}</p>
                @endif

                <a href="{{ route('categorias.show', $categoria->id) }}">
                    Ver categoria
                </a>
            </div>
        @endforeach
    </div>
@endsection
