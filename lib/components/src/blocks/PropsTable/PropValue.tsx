import React, { FC, useState } from 'react';
import { isNil } from 'lodash';
import { styled } from '@storybook/theming';
import { PropSummaryValue } from './PropDef';
import { WithTooltipPure } from '../../tooltip/WithTooltip';
import { Icons } from '../../icon/icon';
import { SyntaxHighlighter } from '../../syntaxhighlighter/syntaxhighlighter';

interface PropValueProps {
  value?: PropSummaryValue;
}

interface PropTextProps {
  text: string;
}

interface PropSummaryProps {
  value: PropSummaryValue;
}

const Text = styled.span(({ theme }: { theme: any }) => ({
  fontFamily: theme.typography.fonts.mono,
  fontSize: `${theme.typography.size.code}%`,
}));

const Expandable = styled.div(({ theme }: { theme: any }) => ({
  fontFamily: theme.typography.fonts.mono,
  fontSize: `${theme.typography.size.code}%`,
  lineHeight: '20px',
  display: 'inline-block',
  textAlign: 'left',
  color: theme.color.secondary,
  backgroundColor: theme.color.lighter,
  padding: '4px 8px 4px 4px',
  borderRadius: '4px',
  cursor: 'pointer',
}));

const ArrowIcon = styled<any, any>(Icons)(({ theme }: { theme: any }) => ({
  height: 10,
  width: 10,
  minWidth: 10,
  color: theme.color.secondary,
  marginLeft: '8px',
  transition: 'transform 0.1s ease-in-out',
  alignSelf: 'center',
  display: 'inline-flex',
}));

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }: { theme: any }) => ({
  padding: '8px 12px',
  minWidth: '50ch',
  maxWidth: '100ch',
  fontSize: theme.typography.size.s2,
}));

const EmptyProp = () => {
  return <span>-</span>;
};

const PropText: FC<PropTextProps> = ({ text }) => {
  return <Text>{text}</Text>;
};

const PropSummary: FC<PropSummaryProps> = ({ value }) => {
  const { summary, detail } = value;

  const [isOpen, setIsOpen] = useState(false);

  if (isNil(detail)) {
    return <PropText text={summary} />;
  }

  return (
    <WithTooltipPure
      closeOnClick
      trigger="click"
      placement="bottom"
      tooltipShown={isOpen}
      onVisibilityChange={isVisible => {
        setIsOpen(isVisible);
      }}
      tooltip={
        <div>
          <StyledSyntaxHighlighter language="jsx" copyable padded format={false}>
            {detail}
          </StyledSyntaxHighlighter>
        </div>
      }
    >
      <Expandable className="sbdocs-expandable">
        <span>{summary}</span>
        <ArrowIcon icon={isOpen ? 'arrowup' : 'arrowdown'} size={10} />
      </Expandable>
    </WithTooltipPure>
  );
};

export const PropValue: FC<PropValueProps> = ({ value }) => {
  return isNil(value) ? <EmptyProp /> : <PropSummary value={value} />;
};
