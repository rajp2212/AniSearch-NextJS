export interface ICoverImage{
    image_url: string;
    large_image_url: string;
    small_image_url : string
}

export interface IAnime{
    mal_id : string,
    content : string,
    title : string,
    url : string,
    image : ICoverImage,
    [key: string]: any
}

export interface HeadingText{
    textNow: string,
    sz: string,
    fw: string,
    
}

    export interface Jpg {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
    }

    export interface Webp {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
    }

    export interface Images {
        jpg: Jpg;
        webp: Webp;
    }

    export interface Images2 {
        image_url: string;
        small_image_url: string;
        medium_image_url: string;
        large_image_url: string;
        maximum_image_url: string;
    }

    export interface Trailer {
        youtube_id: string;
        url: string;
        embed_url: string;
        images: Images2;
    }

    export interface From {
        day: number;
        month: number;
        year: number;
    }

    export interface To {
        day?: any;
        month?: any;
        year?: any;
    }

    export interface Prop {
        from: From;
        to: To;
    }

    export interface Aired {
        from: Date;
        to?: any;
        prop: Prop;
        string: string;
    }

    export interface Broadcast {
        day: string;
        time: string;
        timezone: string;
        string: string;
    }

    export interface Producer {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }

    export interface Licensor {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }

    export interface Studio {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }

    export interface Genre {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }

    export interface AnimeData {
        mal_id: number;
        url: string;
        images: Images;
        trailer: Trailer;
        title: string;
        title_english: string;
        title_japanese: string;
        type: string;
        source: string;
        episodes: number;
        status: string;
        airing: boolean;
        aired: Aired;
        duration: string;
        rating: string;
        score: number;
        scored_by: number;
        rank: number;
        popularity: number;
        members: number;
        favorites: number;
        synopsis: string;
        background: string;
        season: string;
        year: number;
        broadcast: Broadcast;
        producers: Producer[];
        licensors: Licensor[];
        studios: Studio[];
        genres: Genre[];
        [key: string]: any;
    }

export interface IqueryProps {
  mal_id: string | undefined;
  id: string | undefined;
  ep: string | undefined;
}

export interface IEpisodes {
  mal_id: string;
  title: string;
  url: string;
  duration: number;
  aired: string;
  filler: boolean;
  recap: boolean;
  synopsis: string;
}

export interface FetchedData {
  data: IEpisodes;
  images: ICoverImage;
}