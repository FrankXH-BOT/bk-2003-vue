import Films from "@/views/Films/Films";
import NowPlaying from "@/views/Films/NowPlaying";
import ComingSoon from "@/views/Films/ComingSoon";

let FilmsRouter = {
    path:'/films',
    component: Films,
    redirect: '/films/nowplaying',
    children: [
        {path: 'nowplaying', component: NowPlaying},
        {path: 'comingsoon', component: ComingSoon},
    ]
}

export default FilmsRouter;