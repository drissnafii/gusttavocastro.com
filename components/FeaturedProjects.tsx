import styled from 'styled-components'

export const FeaturedProjects = styled.div`
  margin: 10px 0 0 -20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media ${({ theme }) => theme.media.bp2} {
    flex-direction: row;
  }
`
