@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $categoria->nome }}</h1>

        @if ($categoria->descricao)
            <p>{{ $categoria->descricao }}</p>
        @endif

        <h2>Produtos da categoria</h2>

        @forelse ($produtos as $produto)
            <div style="margin-bottom: 15px;">
                <strong>{{ $produto->nome }}</strong>

                @if (isset($produto->preco))
                    <div>R$ {{ number_format($produto->preco, 2, ',', '.') }}</div>
                @endif
            </div>
        @empty
            <p>Nenhum produto encontrado nesta categoria.</p>
        @endforelse

        <a href="{{ route('categorias.index') }}">
            ← Voltar para categorias
        </a>
    </div>
@endsection
