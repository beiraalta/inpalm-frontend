import { ReactNode } from "react";
import { cardStyle } from "./styles";
import { Text, View } from "react-native";

export type DetailCardProps = Readonly<{
  buttons?: ReactNode;
  id: string;
  item: any;
  itemKeys: any[];
  itemLabels: string[];
  targetKey?: string;
}>;

export function DetailCard(props: DetailCardProps) {
  const buttons = props.buttons?? null;
  return (
    <View id={props.id} style={cardStyle.card}>
      <View>
        {props.itemKeys.map((key: any, keyIndex: number) => (
          <View key={props.item[key]} style={cardStyle.cardContainer}>
            <Text style={cardStyle.cardContainerName}>
              {props.itemLabels[keyIndex]}:
            </Text>
            <Text style={cardStyle.cardContainerValue}>
              {props.item[key]}
            </Text>
          </View>
        ))}
        {buttons}
      </View>
    </View>
  );
}
