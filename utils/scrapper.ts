import axios from "axios";
import cheerio from "cheerio";




export const scrapper = async(link:string)=> { 
    try {
    const {data, status} = await axios.get(link);

    if(status === 200) {
       const html = cheerio.load(data);
        const title = html('#wrapper_bg > section > section.content_left > div:nth-child(1) > div.anime_video_body > div.anime_muti_link > ul > li.anime > a').attr("data-video");
        return title;
        
    }else{
        return null;
    }

    } catch (error) {
        console.log(error);
        return null;
    }

}