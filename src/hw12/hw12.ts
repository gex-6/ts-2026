type FilmId = string;

interface Film {
    id: FilmId;
    name: string;
    year: number;
    rate: number;
    awards: string[];
}

interface Category {
    name: string;
    filmIds: FilmId[];
}

interface MatchFilter<T> {
    filter: T;
}

interface RangeFilter<T> {
    filterFrom: T;
    filterTo: T;
}

interface ValuesFilter<T> {
    values: T[];
}

interface FilmFilters {
    name?: MatchFilter<string>;
    year?: RangeFilter<number>;
    rate?: RangeFilter<number>;
    awards?: ValuesFilter<string>;
}

interface CategoryFilters {
    name?: MatchFilter<string>;
}

abstract class BaseList<T, K> {
    currentFilter: T;

    constructor(filter: T) {
        this.currentFilter = filter;
    }

    public abstract getExactItemByFilter(): K | null;
}

class FilmList extends BaseList<FilmFilters, Film> {
    private films: Film[];
    // private currentFilter: FilmFilters = {};

    constructor(films: Film[], filter: FilmFilters) {
        super(filter);
        this.films = films;
    }

    applyFiltersValue(filterValue: FilmFilters): void {
        this.currentFilter = filterValue;
    }

    getExactItemByFilter(): Film | null {
        if (!this.currentFilter.name) return null;

        return this.films.find(film =>
            film.name === this.currentFilter.name?.filter
        ) || null;
    }

    getFilmsDiapasonByFilter(): Film[] {
        const year = this.currentFilter.year;
        const rate = this.currentFilter.rate;

        return this.films.filter(film => {
            // tbd: логіка фільтрування по отриманих значеннях
            return true;
        })
    }

    getFilmsByValuesFilter(): Film[] {
        const awards = this.currentFilter.awards;

        return this.films.filter(film => {
            // tbd: логіка фільтрування по отриманих значеннях
            return true;
        })
    }
}

class CategoryList extends BaseList<CategoryFilters, Category> {
    private categories: Category[];

    constructor(categories: Category[], filter: CategoryFilters) {
        super(filter);
        this.categories = categories;
    }

    applyFiltersValue(filterValue: CategoryFilters): void {
        this.currentFilter = filterValue;
    }

    getExactItemByFilter(): Category | null {
        if (!this.currentFilter.name) return null;

        return this.categories.find(category =>
            category.name === this.currentFilter.name?.filter
        ) || null;
    }
}
