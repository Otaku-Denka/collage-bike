import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';

const theme = {
    container: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        borderRadius: '3px',
        height: '3.6rem',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    input: {
        alignSelf: 'center',
        height: '2.4rem',
        lineHeight: '2.4rem',
        flex: '1',
        width: '100%',
        borderRadius: '3px'
    }
};

const escapeRegexCharacters = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'C#',
        year: 2000
    },
    {
        name: 'C++',
        year: 1983
    },
    {
        name: 'Clojure',
        year: 2007
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: 'Go',
        year: 2009
    },
    {
        name: 'Haskell',
        year: 1990
    },
    {
        name: 'Java',
        year: 1995
    },
    {
        name: 'JavaScript',
        year: 1995
    },
    {
        name: 'Perl',
        year: 1987
    },
    {
        name: 'PHP',
        year: 1995
    },
    {
        name: 'Python',
        year: 1991
    },
    {
        name: 'Ruby',
        year: 1995
    },
    {
        name: 'Scala',
        year: 2003
    }
];

const getSuggestions = (value: string) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
};

const getSuggestionValue = (suggestion: any) => suggestion.name;

const renderSuggestion = (suggestion: any) => {
    return (
        <span>
            {suggestion.name}
        </span>
    );
};

export default class Searchbar extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event: any, newValue: string) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = (value: string) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const inputProps = {
            placeholder: 'search',
            value: this.state.value,
            onChange: this.onChange
        };
        return (
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
            />
        );
    }
}
