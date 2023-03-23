# Proactive & Reactive Development

Leveraging Agile methodologies has become the norm for software companies. Agile allows a product
team to create small iterative and releasable chunks. These chunks enable a product to adapt to the
users and evolve based on hypotheses and metrics, not uneducated guesses. However, while a product
team may favor this ability to change direction quickly, an engineering team may not. To realize the
full potential of changing a product’s trajectory rapidly, we, as an engineer, must learn to balance
between proactive and reactive development styles.

<br>

![Photo by Daria Nepriakhina on Unsplash](https://miro.medium.com/max/700/0*UzdWckDgx23kQFH7)

<br>

## Proactive Development

As engineers, we love to write code that supports all kinds of permutations and futures. Some
thoughts when starting work on a request¹ may be:

<br>

> What happens if we scale up to 10x our current user base?
>
> What if a team member wants to use this utility for X?
>
> What if a team member wants to render this component separately from its parent?
>
> We will need this logic later and since it’s easy, I’ll add it now

<br>

These thoughts help us ensure the code we write ages well and is strongly suited for prototyping new
technologies. You may have done proactive development. A good way of checking is asking yourself if
you’ve ever told a product team member:

<br>

> That’s already done. We did that while doing X

<br>

## Reactive Development

Although these questions are valid, what would happen if this request becomes dispensable in the
future because it wasn’t the answer that the product team believed it to be? How much time did we
lose to “future-proofing” the code?

<br>

To prevent this, we must contextualize these thoughts within the boundaries of the request from the
product team. Framing these questions forces us to write less code and to wait for the request that
demands that code modification. With that context, these thoughts evolve to be:

<br>

> Can this code support our current user base?
>
> For this request, will a team member use this utility for anything else?
>
> For this request, will this component be rendered separately from its parent?
>
> Since it’s easy, I’ll add this logic when its request comes through

<br>

Scoping our work to this allows us to write only the code we need and not the code we may need.

<br>

## Balancing Proactive and Reactive Development

While proactive development is better suited for technical requests, e.g., error reporting, logging,
monitoring, optimizations, prototypes, it is reactive development that is best for product requests.

<br>

![Photo by Alex on Unsplash](https://miro.medium.com/max/700/0*LKePW91r0mEXRb6j)

<br>

As you continue to take on new requests, I urge you to ask yourself: Is this best handled with
proactive or reactive development?

<br>

---

<sup>1</sup> A user story, bug fix, task, or product backlog item.
