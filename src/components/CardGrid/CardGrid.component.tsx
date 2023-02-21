import { QueryFunction, useQuery } from "@tanstack/react-query";
import { DocumentNode, TypedQueryDocumentNode } from "graphql";
import React from "react";
import { Link } from "react-router-dom";
import { FragmentType } from "../../gql";
import { MediaCardFieldsFragment } from "../../gql/graphql";
import { getTrendingAnime, MediaCardFragment } from "../../queries/getTrendingAnime";
import { anilistClient } from "../../queries/graphqlClient";
import VerticalCard from "../Card/VerticalCard/VerticalCard.component";

export type CardGridProps = {
  title: string;
  link: string;
  linkTitle: string;
  slice?: number;
  // Pass any dynamic array of fragments
  media: (
    | ({
        __typename?: "Media" | undefined;
      } & {
        " $fragmentRefs"?:
          | {
              MediaCardFieldsFragment: MediaCardFieldsFragment;
            }
          | undefined;
      })
    | null
  )[];
};

const CardGrid = (props: CardGridProps) => {
  return (
    <div>
      <div className="my-4 flex items-center justify-between">
        <p className="font-bold uppercase tracking-wider text-gray-400">{props.title}</p>
        <Link to={props.link} className="text-xs font-semibold tracking-wider text-gray-500">
          {props.linkTitle}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {props.media &&
          props.media
            .slice(0, props.slice || props.media.length)
            .map((item, index) => item && <VerticalCard key={index} media={item} />)}
      </div>
    </div>
  );
};

export default CardGrid;
