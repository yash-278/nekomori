import { useQuery } from "@tanstack/react-query";
import { FragmentType, useFragment } from "../../gql";
import { useAppDispatch, useAppSelector } from "../../hooks/customRedux";
import { getAnime, MediaFragment } from "../../queries/getAnime";
import { anilistClient } from "../../queries/graphqlClient";
import { setSeason } from "../../store/reducer/season/season.slice";

const Home = () => {
  const { data } = useQuery(["films"], async () =>
    anilistClient.request(getAnime, {
      page: 2,
      perPage: 10, // variables are typed too!
    })
  );

  const season = useAppSelector((state) => state.season);
  const dispatch = useAppDispatch();

  console.warn(data);

  dispatch(setSeason("WINTER"));

  if (!data) return <div>Loading...</div>;

  return (
    <div className="App">
      {data && (
        <ul>{data.Page?.media?.map((e, i) => e && <Anime anime={e} key={`film-${i}`} />)}</ul>
      )}
    </div>
  );
};

const Anime = (props: { anime: FragmentType<typeof MediaFragment> }) => {
  const anime = useFragment(MediaFragment, props.anime);
  return <li>{anime.title?.romaji}</li>;
};
export default Home;
