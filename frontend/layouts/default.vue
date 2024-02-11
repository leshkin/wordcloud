<template>
  <div class="flex flex-col text-gray-800 min-h-screen">
    <header>
      <h1 class="text-5xl text-center font-bold mt-5 font-['Lobster']">{{ $t('header') }}</h1>
    </header>

    <section class="max-w-screen-lg mx-auto px-4">
      <YandexAdRefresh type="header" />
      <slot></slot>
    </section>

    <footer class="flex flex-col items-center bg-neutral-100 py-10 mt-auto px-4">
      <div class="flex flex-wrap justify-center gap-4 text-gray-700 mb-8">
        <a href="/">English</a>
        <a href="/es">Español</a>
        <a href="/pt">Português</a>
        <a href="/fr">Français</a>
        <a href="/de">Deutsch</a>
        <a href="/tr">Türk</a>
        <a href="/pl">Polski</a>
        <a href="/tl">Filipino</a>
        <a href="/ru">Русский</a>
        <a href="/uk">Українська</a>
        <a href="/hi">हिन्दी</a>
        <a href="/zh">中文</a>
      </div>
      <div class="text-gray-500 mb-2"><a href="https://github.com/leshkin/wordcloud">View code on GitHub</a></div>
      <div class="text-gray-500 mb-2">
        <a href="https://www.facebook.com/wordcloud.online">Project page on Facebook</a>
      </div>
      <div class="text-gray-500">
        <a href="https://github.com/jasondavies/d3-cloud">Based on d3-cloud library</a>
      </div>
    </footer>
  </div>
</template>
