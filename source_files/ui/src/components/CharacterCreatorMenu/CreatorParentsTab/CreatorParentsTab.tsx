import { Divider, FormLabel, Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Client, defaultParents, fatherNames, motherNames } from '@shared';
import { useMemo, useState } from 'react';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';

type CreatorParentsTabProps = {
	defaultExpanded?: boolean;
};

export default function CreatorParentsTab({ defaultExpanded = false }: CreatorParentsTabProps) {
	const numberOfFathers = fatherNames.length;
	const numberOfMothers = motherNames.length;

	const [father, setFather] = useState(defaultParents.father);
	const [mother, setMother] = useState(defaultParents.mother);
	const [similarity, setSimilarity] = useState(defaultParents.similarity);
	const [skinSimilarity, setSkinSimilarity] = useState(defaultParents.skinSimilarity);
	const maleParentImages = useMemo(() => {
		const imageMap: Record<number, string> = {};

		Array.from({ length: numberOfFathers }, (_, i) => i).forEach((num) => {
			imageMap[num] = new URL(
				`../../../assets/freemode-ped-parents/parent_male_${num.toString()}.png`,
				import.meta.url
			).href;
		});

		return imageMap;
	}, []);

	const femaleParentImages = useMemo(() => {
		const imageMap: Record<number, string> = {};

		Array.from({ length: numberOfMothers }, (_, i) => i).forEach((num) => {
			imageMap[num] = new URL(
				`../../../assets/freemode-ped-parents/parent_female_${num.toString()}.png`,
				import.meta.url
			).href;
		});

		return imageMap;
	}, []);

	const similarityMarks = [
		{
			value: 0,
			label: 'Mother'
		},
		{
			value: 1,
			label: 'Father'
		}
	];

	return (
		<ExpandableMenu summary={'Parents'} defaultExpanded={defaultExpanded}>
			<Stack sx={{ padding: '0 1rem' }}>
				<Stack sx={{ justifyContent: 'center' }}>
					<img
						src={maleParentImages[father]}
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '1rem',
							margin: 'auto'
						}}
					/>
					<Slider
						name="fatherSlider"
						value={father}
						step={1}
						min={0}
						max={numberOfFathers - 1}
						onChange={(_, value) => {
							setFather(value as number);
							mp.trigger(
								Client.Events.CharacterCreator.UpdateParents,
								JSON.stringify({
									father,
									mother,
									similarity,
									skinSimilarity
								})
							);
						}}
					/>
					<FormLabel sx={{ textAlign: 'center' }}>Father: {fatherNames[father]}</FormLabel>
				</Stack>
				<Divider />
				<Stack sx={{ justifyContent: 'center' }}>
					<img
						src={femaleParentImages[mother]}
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '1rem',
							margin: 'auto'
						}}
					/>
					<Slider
						name="motherSlider"
						value={mother}
						step={1}
						min={0}
						max={numberOfMothers - 1}
						onChange={(_, value) => {
							setMother(value as number);
							mp.trigger(
								Client.Events.CharacterCreator.UpdateParents,
								JSON.stringify({
									father,
									mother,
									similarity,
									skinSimilarity
								})
							);
						}}
					/>
					<FormLabel sx={{ textAlign: 'center' }}>Mother: {motherNames[mother]}</FormLabel>
				</Stack>
				<Divider />
				<Slider
					name="similaritySlider"
					value={similarity}
					step={0.01}
					marks={similarityMarks}
					min={0}
					max={1}
					onChange={(_, value) => {
						setSimilarity(value as number);
						mp.trigger(
							Client.Events.CharacterCreator.UpdateParents,
							JSON.stringify({
								father,
								mother,
								similarity,
								skinSimilarity
							})
						);
					}}
				/>
				<FormLabel sx={{ textAlign: 'center' }}>Similarity</FormLabel>
				<Divider />
				<Slider
					name="skinSimilaritySlider"
					value={skinSimilarity}
					step={0.01}
					marks={similarityMarks}
					min={0}
					max={1}
					onChange={(_, value) => {
						setSkinSimilarity(value as number);
						mp.trigger(
							Client.Events.CharacterCreator.UpdateParents,
							JSON.stringify({
								father,
								mother,
								similarity,
								skinSimilarity
							})
						);
					}}
				/>
				<FormLabel sx={{ textAlign: 'center' }}>Skin similarity</FormLabel>
			</Stack>
		</ExpandableMenu>
	);
}
