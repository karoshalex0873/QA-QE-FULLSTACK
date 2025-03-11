// 3. Populate books
export const populateBooks = (books) => {
    try {
        const bookHTML = books
            .map((book) => `
      <div class="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out overflow-hidden flex-1 min-w-[300px] max-w-[320px] m-2">
        
        <!-- Image Section -->
        <div class="relative flex-shrink-0 h-64 bg-gray-100 dark:bg-slate-700 overflow-hidden rounded-2xl">
          <img 
            src="${book.image}" 
            alt="${book.title}" 
            class=" w-full h-auto px-3 py-2 object-cover justify-center items-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          
          <!-- Genre Badge -->
          <div class="absolute bottom-4  left-2 bg-primary/70 backdrop-blur-sm text-white px-6 py-3 rounded-md text-sm font-serif shadow-sm">
            ${book.genre}
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex flex-col flex-grow p-5 pt-4 space-y-3">
          <!-- Title & Author -->
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white truncate hover:text-primary transition-colors">
              ${book.title}
            </h3>
            <p class="text-md text-slate-600 dark:text-light-100 font-medium"> BY ${' '} 
              ${book.author}
            </p>
          </div>

          <!-- Metadata Flex -->
          <div class="flex flex-col space-y-2 text-md text-slate-600 dark:text-slate-400">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>${book.year}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <span>${book.pages} pages</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>${book.publisher}</span>
            </div>
          </div>

          <!-- Price & CTA -->
          <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <div class="space-y-1">
              <span class="text-sm text-slate-500">Price</span>
              <p class="text-2xl font-bold dark:text-white text-primary ">Ksh ${book.price}</p>
            </div>
            <button
              class="flex items-center space-x-2 bg-light-200/30 hover:bg-primary-dark text-primary px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              data-id="${book.id}"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
              <span class="font-medium">Buy</span>
            </button>
          </div>
        </div>

        <!-- Wishlist Button -->
        <button 
          class="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-md transition-all hover:text-red-500"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>`)
            .join("");
        const booksContainer = document.getElementById("books");
        booksContainer.innerHTML = bookHTML;
        // Remove loader
        const loader = document.querySelector(".loader-container");
        if (loader)
            loader.remove();
    }
    catch (error) {
        console.error("Error populating books:", error);
    }
};
// 4. Event listener with improved type safety
// 5. Execute the fetch and populate flow
//# sourceMappingURL=books.js.map